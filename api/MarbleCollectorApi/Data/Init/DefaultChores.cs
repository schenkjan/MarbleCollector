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
                },
                new Chore
                {
                    Name = "Abfallsack im Container entsorgen",
                    Value = 1,
                    DueDate = new DateTime(2021, 9, 28)
                }
                ,
                new Chore
                {
                    Name = "Zimmer aufräumen und staubsaugen",
                    Value = 10,
                    DueDate = new DateTime(2021, 12, 24)
                },
                new Chore
                {
                    Name = "Zähne putzen",
                    Value = 1,
                    DueDate = DateTime.UtcNow.AddDays(-1)
                }
                ,
                new Chore
                {
                    Name = "Tisch abräumen",
                    Value = 1,
                    DueDate = DateTime.UtcNow
                }
            };
        }
    }
}