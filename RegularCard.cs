using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebAPI.Models
{
    public class Card
    {
        public int CardId { get; set; }
        public string CreatedDate { get; set; }
        public string UpdatedDate { get; set; }
        public int InitialLoad { get; set; }
        public int CurrentLoad { get; set; }
        public string ExpirationDate { get; set; }
        public string CardType { get; set; }
        public string IDNumber { get; set; }
    }
}