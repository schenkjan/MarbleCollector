namespace MarbleCollectorApi.Config
{
    public class AuthenticationConfigSection
    {
        public const string Name = "Authentication";

        public string TokenSecret { get; set; }
        public int TokenLifespan { get; set; }
        public string TokenIssuer { get; set; }
        public string TokenAudience { get; set; }
    }
}
