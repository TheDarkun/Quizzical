using System.Text.Json.Serialization;

namespace Quizzical_Server.Models;

public class QuestionModel
{
    [JsonIgnore]
    public required int Id { get; set; }
    public required string Prompt { get; set; }
    public required List<AnswerModel> Answers { get; set; }
}