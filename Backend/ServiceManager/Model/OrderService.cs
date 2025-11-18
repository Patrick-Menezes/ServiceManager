using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace ServiceManager.Model
{
    public class OrderService
    {
        public OrderService()
        {
        }


        public int Id { get; set; }
        [Required]
       public string ClientName {  get; set; }
        [Required]
       public string Description { get; set; }
       public OrderStatus Status { get; set; }
       public DateTime CreatAt { get; set; }

        public OrderService(int id, string clientName, string description, OrderStatus status, DateTime creatAt)
        {
            Id = id;
            ClientName = clientName ?? throw new ArgumentNullException(nameof(clientName));

            Description = description ?? throw new ArgumentNullException(nameof(description));
            Status = status;
            CreatAt = creatAt;
        }

    }

    
}
