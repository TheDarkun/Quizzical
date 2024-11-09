using System.Text.Json.Serialization;

namespace Quizzical_Server.Endpoints.Quiz.Responses;

public class GetQuizResponse
{
    public int QuizId { get; set; }
    public string Author { get; set; }
    public string Title { get; set; }
    public List<GetQuizResponseQuestions> Questions { get; set; }
}

public class GetQuizResponseQuestions
{
    public bool MultipleChoices { get; set; }
    public int QuestionId { get; set; }
    public string Prompt { get; set; }
    public List<GetQuizResponseAnswers> Answers { get; set; }
}

public class GetQuizResponseAnswers
{
    [JsonIgnore]
    public bool IsCorrect { get; set; }
    public int AnswerId { get; set; }
    public string Text { get; set; }
}