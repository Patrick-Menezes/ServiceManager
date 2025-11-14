using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using ServiceManager.Data;
using ServiceManager.Model;


namespace ServiceManager;


    [ApiController]
    [Route("api/[controller]")]
    public class OrderServiceController : ControllerBase
    
{ 
        private readonly AppDbContext _Context;

        public OrderServiceController(AppDbContext context)
        {

            _Context = context;
        }

      
         [HttpPost]
        public async Task<IActionResult> Create(OrderService service)
        {
       service.Status = OrderStatus.Open;
        service.CreatAt= DateTime.Now;
          
        _Context.Add(service);
        await _Context.SaveChangesAsync();  
        return Ok(service);

        }

    

  }
