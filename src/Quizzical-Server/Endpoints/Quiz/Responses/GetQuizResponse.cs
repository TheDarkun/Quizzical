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
    public int QuestionId { get; set; }
    public string Prompt { get; set; }
    public List<GetQuizResponseAnswers> Answers { get; set; }
}

public class GetQuizResponseAnswers
{
    public int AnswerId { get; set; }
    public string Text { get; set; }
}