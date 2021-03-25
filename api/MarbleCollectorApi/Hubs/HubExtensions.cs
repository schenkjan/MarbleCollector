using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace MarbleCollectorApi.Hubs
{
    public static class HubExtensions
    {

        public static Task SendHeartbeat(this IClientProxy clientProxy, string source)
        {
            return clientProxy.SendAsync("Heartbeat", GetGuid(), source, $"Hearbeat :: {DateTime.Now}");
        }

        public static Task SendParentNotification(this IClientProxy clientProxy, ParentNotification parentNotification, int userId, int entityId)
        {
            return clientProxy.SendAsync(parentNotification.ToString(), GetGuid(), userId, entityId);
        }

        public static Task SendChildNotification(this IClientProxy clientProxy, ChildNotification childNotification, int userId, int entityId)
        {
            return clientProxy.SendAsync(childNotification.ToString(), GetGuid(), userId, entityId);
        }

        private static string GetGuid()
        {
            return Guid.NewGuid().ToString();
        }
    }
}
