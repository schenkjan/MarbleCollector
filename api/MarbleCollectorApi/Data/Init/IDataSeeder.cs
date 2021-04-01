using System.Collections.Generic;

namespace MarbleCollectorApi.Data.Init
{
    public interface IDataSeeder<T>
    {
        IEnumerable<T> GetDemoData();
        IEnumerable<T> GetDevelopmentData();
    }
}
