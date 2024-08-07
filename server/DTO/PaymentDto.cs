using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.DTO
{
  public class PaymentDto
  {
    public required string UserId { get; set; }
    public int Price { get; set; }
  }

  public class PaymentResponse
  {
    public string paymentIntent { get; set; }
    public string customer { get; set; }
    public string ephemeralKey { get; set; }
  }
}
