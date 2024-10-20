namespace Quizzical_Server.Models;

public class QuestionModel
{
    public required string Title { get; set; }
    public required List<AnswerModel> Answers { get; set; }
}