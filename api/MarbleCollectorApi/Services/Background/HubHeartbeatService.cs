using MarbleCollectorApi.Hubs;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace MarbleCollectorApi.Services.Background
{
    public class HubHeartbeatService : BackgroundService
    {
        private readonly ILogger<HubHeartbeatService> _logger;
        private readonly IHubContext<ParentNotificationHub> _parentNotificationHubContext;

        public HubHeartbeatService(ILogger<HubHeartbeatService> logger, IHubContext<ParentNotificationHub> parentNotificationHubContext)
        {
            _logger = logger;
            _parentNotificationHubContext = parentNotificationHubContext;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            _logger.LogDebug($"HubHeartbeatService is starting.");

            stoppingToken.Register(() =>
                _logger.LogDebug($"HubHeartbeatService background task is stopping."));

            while (!stoppingToken.IsCancellationRequested)
            {
                _logger.LogDebug($"HubHeartbeatService task doing background work.");
                await _parentNotificationHubContext.Clients.All.SendAsync(ParentNotificationHub.ReceiveMessageMethod, nameof(HubHeartbeatService), $"Hearbeat :: {DateTime.Now}");
                await Task.Delay(10000, stoppingToken);
            }

            _logger.LogDebug($"HubHeartbeatService background task is stopping.");
        }
    }
}
