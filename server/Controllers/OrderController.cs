using Backend.Config.Base;
using Backend.DTO.Order;
using Backend.Interfaces;
using Backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [Route("order")]
    [ApiController]
    public class OrderController : ControllerProvider
    {
        private readonly IOrderRepository _orderRepo;

        public OrderController(IOrderRepository orderRepo)
        {
            _orderRepo = orderRepo;
        }

        [HttpPost("placeorder")]
        public async Task<IActionResult> PlaceOrder([FromBody] OrderDTO orderDto)
        {
            if (orderDto == null)
            {
                throw new Exception("Invalid order data.");
            }

            try
            {
                var order = await _orderRepo.PlaceOrderAsync(orderDto);
                return OnSuccess(order);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }


        [HttpGet("{id}")]
        public async Task<IActionResult> GetOrderByIdAsync(int id)
        {
            var order = await _orderRepo.GetOrderByIdAsync(id);

            if (order == null)
            {
                throw new Exception("Order not found.");
            }

            return OnSuccess(order);
        }

        [HttpGet]
        public async Task<IActionResult> GetAllOrdersAsync()
        {
            var orders = await _orderRepo.GetAllOrdersAsync();
            return OnSuccess(orders);
        }
        [HttpGet("order/{userId}")]
        public async Task<IActionResult> GetOrdersByUserId(int userId)
        {
            try
            {
                var orders = await _orderRepo.GetOrdersByUserIdAsync(userId);
                if (orders == null || !orders.Any())
                {
                   throw new Exception("No orders found for the given user ID.");
                }

                return OnSuccess(orders);
            }
            catch (Exception ex)
            {
                throw new Exception($"An error occurred: {ex.Message}");
            }
        }
    }
}
