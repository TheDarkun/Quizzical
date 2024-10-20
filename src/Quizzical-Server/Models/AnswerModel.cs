namespace Quizzical_Server.Models;

public class AnswerModel
{
    public required string Text { get; set; }
    public required bool IsCorrect { get; set; }
}