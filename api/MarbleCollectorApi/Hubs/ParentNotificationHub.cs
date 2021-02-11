using Microsoft.AspNetCore.SignalR;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace MarbleCollectorApi.Hubs
{
    public class ParentNotificationHub : Hub
    {
        public const string ReceiveMessageMethod = "ReceiveMessage";

        public async Task SendMessage(string user, string message)
        {
            await Clients.All.SendAsync(ReceiveMessageMethod, user, message);
        }
    }
}
