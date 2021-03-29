using MarbleCollectorApi.Hubs;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System.Threading;
using System.Threading.Tasks;

namespace MarbleCollectorApi.Services.Background
{
    public class HubHeartbeatService : BackgroundService
    {
        private readonly ILogger<HubHeartbeatService> _logger;
        private readonly IHubContext<ParentNotificationHub> _parentNotificationHubContext;
        private readonly IHubContext<ChildNotificationHub> _childrenNotificationHubContext;

        public HubHeartbeatService(ILogger<HubHeartbeatService> logger, IHubContext<ParentNotificationHub> parentNotificationHubContext, IHubContext<ChildNotificationHub> childrenNotificationHubContext)
        {
            _logger = logger;
            _parentNotificationHubContext = parentNotificationHubContext;
            _childrenNotificationHubContext = childrenNotificationHubContext;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            _logger.LogDebug($"HubHeartbeatService is starting.");

            stoppingToken.Register(() =>
                _logger.LogDebug($"HubHeartbeatService background task is stopping."));

            while (!stoppingToken.IsCancellationRequested)
            {
                _logger.LogDebug($"HubHeartbeatService task doing background work.");

                await _parentNotificationHubContext.Clients.All.SendHeartbeat(nameof(HubHeartbeatService));
                await _childrenNotificationHubContext.Clients.All.SendHeartbeat(nameof(HubHeartbeatService));

                await Task.Delay(10000, stoppingToken);
            }

            _logger.LogDebug($"HubHeartbeatService background task is stopping.");
        }
    }
}
