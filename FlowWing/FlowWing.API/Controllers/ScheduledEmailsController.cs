﻿using FlowWing.Business.Abstract;
using FlowWing.Entities;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using FlowWing.API.Helpers;
using FlowWing.API.Models;
using Hangfire;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace FlowWing.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("AllowAll")]
    public class ScheduledEmailsController : ControllerBase
    {
        private IScheduledEmailService _scheduledEmailService;
        private IEmailLogService _emailLogService;
        private EmailSenderService _emailSenderService;
        private AppSettings _appSettings;
        private readonly IRecurringJobManager _recurringJobManager;

        public ScheduledEmailsController(IScheduledEmailService scheduledEmailService, IEmailLogService emailLogService, IOptions<AppSettings> appSettings, IRecurringJobManager recurringJobManager, EmailSenderService emailSenderService)
        {
            _scheduledEmailService = scheduledEmailService;
            _emailLogService = emailLogService;
            _appSettings = appSettings.Value;
            _recurringJobManager = recurringJobManager;
            _emailSenderService = emailSenderService;
        }

        /// <summary>
        /// Get All Scheduled Emails
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetAllScheduledEmails()
        {
            var scheduledEmails = await _scheduledEmailService.GetAllScheduledEmailsAsync();
            return Ok(scheduledEmails);
        }

        /// <summary>
        /// Get Scheduled Email By Id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("{id}")]
        public async Task<IActionResult> GetScheduledEmailById(int id)
        { 
            var scheduledEmail = await _scheduledEmailService.GetScheduledEmailByIdAsync(id);
            if (scheduledEmail == null)
            {
                return NotFound();
            }
            return Ok(scheduledEmail);
        }

        /// <summary>
        /// Create an Scheduled Email
        /// </summary>
        /// <param name="scheduledEmail"></param>
        /// <returns></returns>
        [HttpPost("CreateScheduledEmail")]
        [Authorize]
        public async Task<IActionResult> CreateScheduledEmail([FromBody] ScheduledEmailLogModel scheduledEmail)
        {
            var token = HttpContext.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();
            if (JwtHelper.TokenIsValid(token,_appSettings.SecretKey))
            {
                (string UserEmail, string UserId) = JwtHelper.GetJwtPayloadInfo(token);

                EmailLog newEmailLog = new EmailLog
                {
                    UserId = int.Parse(UserId),
                    CreationDate = DateTime.UtcNow,
                    SentDateTime = scheduledEmail.SentDateTime,
                    RecipientsEmail = scheduledEmail.RecipientsEmail,
                    SenderEmail = UserEmail,
                    EmailSubject = scheduledEmail.EmailSubject,
                    SentEmailBody = scheduledEmail.EmailBody,
                    Status = false,
                    IsScheduled = true
                };

                var createdEmailLog = await _emailLogService.CreateEmailLogAsync(newEmailLog);

                ScheduledEmail newScheduledEmail = new ScheduledEmail
                {
                    EmailLogId = createdEmailLog.Id,
                    IsRepeating = false,
                    NextSendingDate = scheduledEmail.SentDateTime,
                };

                var createdScheduledEmail = await _scheduledEmailService.CreateScheduledEmailAsync(newScheduledEmail);

                BackgroundJob.Schedule(() => _emailSenderService.SendEmail(scheduledEmail.RecipientsEmail,scheduledEmail.EmailSubject,scheduledEmail.EmailBody,createdEmailLog)
                ,scheduledEmail.SentDateTime);
                
                return CreatedAtAction(nameof(CreateScheduledEmail), new { id = createdScheduledEmail.Id }, createdScheduledEmail);
            }
            return Unauthorized(); 
        }
        
        /// <summary>
        /// Create an Repeating scheduled email
        /// </summary>
        /// <param name="repeatingEmail"></param>
        /// <returns></returns>
        [HttpPost("CreateScheduledRepeatingEmail")]
        [Authorize]
        public async Task<IActionResult> CreateScheduledRepeatingEmail([FromBody] ScheduledRepeatingEmailModel scheduledRepeatingEmailModel)
        {
            var token = HttpContext.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();
            if (JwtHelper.TokenIsValid(token,_appSettings.SecretKey))
            {
                (string UserEmail, string UserId) = JwtHelper.GetJwtPayloadInfo(token);

                EmailLog newEmailLog = new EmailLog
                {
                    UserId = int.Parse(UserId),
                    CreationDate = DateTime.UtcNow,
                    SentDateTime = scheduledRepeatingEmailModel.NextSendingDate,
                    RecipientsEmail = scheduledRepeatingEmailModel.RecipientsEmail,
                    SenderEmail = UserEmail,
                    EmailSubject = scheduledRepeatingEmailModel.EmailSubject,
                    SentEmailBody = scheduledRepeatingEmailModel.EmailBody,
                    Status = false,
                    IsScheduled = true
                };
                
                var createdEmailLog = await _emailLogService.CreateEmailLogAsync(newEmailLog);
                
                ScheduledEmail newScheduledRepeatingEmail = new ScheduledEmail
                {
                    EmailLogId = createdEmailLog.Id,
                    IsRepeating = true,
                    NextSendingDate = scheduledRepeatingEmailModel.NextSendingDate,
                    RepeatInterval = scheduledRepeatingEmailModel.RepeatInterval,
                    RepeatEndDate = scheduledRepeatingEmailModel.RepeatEndDate
                };
                
                var createdScheduledEmail = await _scheduledEmailService.CreateScheduledEmailAsync(newScheduledRepeatingEmail);
                
                return CreatedAtAction(nameof(CreateScheduledEmail), new { id = createdScheduledEmail.Id }, createdScheduledEmail);
            }
            return Unauthorized(); 
        }

        /// <summary>
        /// Update an Scheduled Email
        /// </summary>
        /// <param name="scheduledEmail"></param>
        /// <returns></returns>
        [HttpPut]
        public async Task<IActionResult> UpdateScheduledEmail([FromBody] ScheduledEmail scheduledEmail)
        {
            var existingScheduledEmail = await _scheduledEmailService.GetScheduledEmailByIdAsync(scheduledEmail.Id);
            if (existingScheduledEmail == null)
            {
                return NotFound();
            }
            var updatedScheduledEmail = await _scheduledEmailService.UpdateScheduledEmailAsync(scheduledEmail);
            return Ok(updatedScheduledEmail);
        }

        /// <summary>
        /// Delete an Scheduled Email
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteScheduledEmail(int id)
        {
            if (await _scheduledEmailService.GetScheduledEmailByIdAsync(id) == null)
            {
                return NotFound();
            }
            await _scheduledEmailService.DeleteScheduledEmailAsync(id);
            return Ok();
        }
    }
}