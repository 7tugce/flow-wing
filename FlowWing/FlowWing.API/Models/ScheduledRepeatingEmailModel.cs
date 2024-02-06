namespace FlowWing.API.Models;

public class ScheduledRepeatingEmailModel
{
    public string RecipientsEmail { get; set; }
    public string EmailSubject { get; set; }
    public string EmailBody { get; set; }
    public DateTime NextSendingDate { get; set; }
    public String RepeatInterval { get; set; }
    public DateTime RepeatEndDate { get; set; }
    public List<string> Attachments { get; set; }
}