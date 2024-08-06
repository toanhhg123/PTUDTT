using Backend.Config.Base;
using Backend.DTO;
using Backend.Interfaces;
using Backend.Models;
using Backend.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [Route("recomment")]
    [ApiController]
    public class RecommentProdController : ControllerProvider
    {
        private readonly IRecommentProductRepository _recommentProductRepository;

        public RecommentProdController(IRecommentProductRepository recommentProductRepository)
        {
            _recommentProductRepository = recommentProductRepository;
        }
        // GET: api/recomment/{productId}
        [HttpGet("{productId}")]
        public async Task<IActionResult> GetRecommentProducts(int productId)
        {
            var recommentProducts = await _recommentProductRepository.GetRecommentProductsAsync(productId);

            if (recommentProducts == null || !recommentProducts.Any())
            {
                throw new Exception("RecommentProduct not found.");
            }

            return this.OnSuccess(recommentProducts);
        }

    }
}
