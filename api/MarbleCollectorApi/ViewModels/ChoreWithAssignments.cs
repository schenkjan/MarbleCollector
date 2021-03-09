using System;
using System.Collections.Generic;

namespace MarbleCollectorApi.ViewModels
{
    public class ChoreWithAssignments
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public int Value { get; set; }

        public DateTime DueDate { get; set; }

        public IEnumerable<Assignment> Assignments { get; set; }
    }
}