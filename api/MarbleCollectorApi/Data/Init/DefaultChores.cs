using MarbleCollectorApi.Data.Models;
using System;

namespace MarbleCollectorApi.Data.Init
{
    public static class DefaultChores
    {
        public static Chore[] GetChores()
        {
            return new[]
            {
                new Chore
                {
                    Name = "Zimmer aufräumen",
                    Value = 5,
                    DueDate = DateTime.UtcNow.AddDays(1)
                },
                new Chore
                {
                    Name = "Zaun streichen",
                    Value = 20,
                    DueDate = DateTime.UtcNow.AddDays(14)
                },
                new Chore
                {
                    Name = "Rasen mähen",
                    Value = 7,
                    DueDate = DateTime.UtcNow.AddDays(5)
                }
            };
        }
    }
}