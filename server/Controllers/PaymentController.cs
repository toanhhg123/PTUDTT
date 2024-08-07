using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend.Config.Base;
using Backend.DTO.UserAccount;
using Backend.Interfaces;
using Backend.Models;
using Backend.Models.ViewModel;
using Microsoft.AspNetCore.Mvc;
using server.DTO;
using Stripe;

namespace Backend.Controllers
{
  [ApiController]
  [Route("payment")]
  public class PaymentController : ControllerProvider
  {



    private readonly IConfiguration _configuration;

    public PaymentController(IConfiguration configuration)
    {
      _configuration = configuration;
    }

    //[HttpGet]
    //public async Task<IActionResult> Index()
    //{
    //  var User = new User() { Name = "", Email = "abc@gmail.com" };

    //  await Task.CompletedTask;

    //  return this.OnSuccess(
    //    _authService.CreateToken(User)
    //  );
    //}

    [HttpPost("create-payment-intent")]
    public IActionResult CreatePaymentIntent([FromBody] PaymentDto paymentDto)
    {
      StripeConfiguration.ApiKey = _configuration["Stripe:SecretKey"];

      Customer customer = GetCustomer(paymentDto.UserId);

      var options = new PaymentIntentCreateOptions
      {
        Amount = paymentDto.Price,
        Currency = "usd",
        Customer = customer.Id,
        AutomaticPaymentMethods = new PaymentIntentAutomaticPaymentMethodsOptions
        {
          Enabled = true,
        },
      };

      var service = new PaymentIntentService();
      var paymentIntent = service.Create(options);

      return this.OnSuccess(new PaymentResponse()
      {
        paymentIntent = paymentIntent.ClientSecret,
        customer = customer.Id,
        ephemeralKey = CreateEphemeralKey(customer.Id),
      });
    }

    private string CreateEphemeralKey(string customerId)
    {
      var service = new EphemeralKeyService();
      var options = new EphemeralKeyCreateOptions
      {
        Customer = customerId,
        StripeVersion = "2023-10-16"
      };

      var key = service.Create(options);
      return key.Secret;
    }

    private Customer GetCustomer(string customerId)
    {
      var customerService = new CustomerService();
      Customer customer;

      try
      {
        customer = customerService.Get(customerId);
      }
      catch (StripeException)
      {

        var customerOptions = new CustomerCreateOptions
        {
          Description = "Test customer",

        };
        customer = customerService.Create(customerOptions);
      }

      return customer;
    }


  }
}
