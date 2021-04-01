using MarbleCollectorApi.Data.Models;
using System.Collections.Generic;

namespace MarbleCollectorApi.Data.Init
{
    public class DefaultRewards : IDataSeeder<Reward>
    {
        public IEnumerable<Reward> GetDemoData()
        {
            return new[] {
                new Reward
                {
                    Name = "Bräteln auf dem Gurten",
                    Description = "Mit Cervelat und Marshmallows",
                    Value = 10
                },
                new Reward
                {
                    Name = "1 Stunde Fernseh schauen",
                    Description = "Trickfilme schauen",
                    Value = 5
                },
                
            };
        }

        public IEnumerable<Reward> GetDevelopmentData()
        {
            return new[]
            {
                new Reward
                {
                    Name = "1 Stunde Fernseh schauen",
                    Description = "Trickfilme schauen",
                    Value = 5
                },
                new Reward
                {
                    Name = "Skitag mit Papi",
                    Description= "Skitag mit Papi inklusive Portion Pommes Frites zum Mittagessen",
                    Value = 20
                },
                new Reward
                {
                    Name = "Bräteln auf dem Gurten",
                    Value = 10
                },
                new Reward
                {
                    Name = "Wochenendausflug in den Europapark",
                    Value = 100,
                    Description = "Mit Übernachtung im Hotel, 2 Tage im Europapark, Hin- und Rückreise."
                }
            };
        }
    }
}