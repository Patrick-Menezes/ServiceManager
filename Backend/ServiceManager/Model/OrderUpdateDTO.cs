using System.ComponentModel.DataAnnotations;

namespace ServiceManager.Model
{
    public class OrderUpdateDTO
    {

        
        public string? Name { get; set; }
        
        public string? Description { get; set; }

        public OrderStatus? Status {  get; set; }


    }
}
