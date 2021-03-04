using System;

namespace MarbleCollectorApi.ViewModels
{
    public class Chore
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public int Value { get; set; }

        public DateTime DueDate { get; set; }
    }
}