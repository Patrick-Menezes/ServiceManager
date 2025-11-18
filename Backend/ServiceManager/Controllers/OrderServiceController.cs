using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.Extensions.Options;
using ServiceManager.Data;
using ServiceManager.Model;
using System.Reflection.Metadata.Ecma335;


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


        ///Add service
         [HttpPost]
        public async Task<IActionResult> Create(OrderService service)
        {
        service.Status = OrderStatus.Open;
        service.CreatAt= DateTime.Now;
          
        _Context.Add(service);
        await _Context.SaveChangesAsync();  
        return Ok(service);

        }

        /// get all order services
        [HttpGet]
        public async Task<IEnumerable<OrderService>> GetServicesListAsync()

        {
            var Services = await _Context.orders.OrderBy(O => O.CreatAt).ToListAsync();
            return Services;
        }

        /// get service by id
        [HttpGet("{id}")]
        public async Task<IActionResult> GetServiceByIdAsync (int id)
        {

        var order= await _Context.orders.FirstOrDefaultAsync(o => o.Id == id);
            if(order== null)
            { 
                return NotFound();
            }
          return Ok(order);
        }    

        //delete Service
        [HttpDelete("{id}")]  
        public async Task<IActionResult> DeleteSeviceAsync(int id)
        {

           var service = await _Context.orders.FirstOrDefaultAsync(O=> O.Id == id);

            if (service == null) 
            {
                return NoContent();
            }

            _Context.orders.Remove(service);
            _Context.SaveChanges();
            return Ok(service);


        }
 
        [HttpPut("{id}")]
        public  async Task<IActionResult>UpdateServiceAsync(int id ,string Name, string description, OrderStatus status)
        {
          var UpdatedService= await _Context.orders.FirstOrDefaultAsync(o => o.Id == id);
           if(UpdatedService == null)
        {
            return NotFound();
        }

        UpdatedService.ClientName = Name;
        UpdatedService.Description= description;
        UpdatedService.Status = status;

        _Context.Update(UpdatedService);
        await  _Context.SaveChangesAsync();

        return Ok(UpdatedService);

        }

        //parcial update method
        [HttpPatch("{id}")]
        public async Task<IActionResult>PatartialUpedateAsync(int id,[FromBody]OrderUpdateDTO OrderDTO )
        {

            var updateService = await _Context.orders.FirstOrDefaultAsync(O=>O.Id== id);

            if(updateService== null)
            {
                return NotFound();
            }


            ///verificando se os campos estao preenchidos para serem ou nao alterados
            if(!string.IsNullOrWhiteSpace(OrderDTO.Name))
            {
                updateService.ClientName=OrderDTO.Name;
            }

            if(!string.IsNullOrWhiteSpace(OrderDTO.Description))
            {
                updateService.Description=OrderDTO.Description;
            }
            if(OrderDTO.Status.HasValue)
            {
                updateService.Status= OrderDTO.Status.Value;
            }
 
            await _Context.SaveChangesAsync();
            return Ok(updateService);
        }




}
