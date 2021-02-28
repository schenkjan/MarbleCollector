using Microsoft.AspNetCore.SignalR;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace MarbleCollectorApi.Hubs
{
    public class ChildrenNotificationHub : Hub
    {
        public const string UpdateFiguresMethod = "UpdateFigures";

        public async Task UpdateFigures(string user, string message)
        {
            await Clients.All.SendAsync(UpdateFiguresMethod, user, message);
        }
    }
}
