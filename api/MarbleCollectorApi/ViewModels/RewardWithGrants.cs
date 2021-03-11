using System.Collections.Generic;

namespace MarbleCollectorApi.ViewModels
{
    public class RewardWithGrants
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public int Value { get; set; }

        public IEnumerable<Grant> Grants { get; set; }
    }
}