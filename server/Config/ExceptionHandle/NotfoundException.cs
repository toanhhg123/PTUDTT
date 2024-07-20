public class NotFountException : Exception
{
  public NotFountException()
  {
  }

  public NotFountException(string message)
      : base(message)
  {
  }

  public NotFountException(string message, Exception inner)
      : base(message, inner)
  {
  }
}
