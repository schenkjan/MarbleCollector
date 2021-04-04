using MarbleCollectorApi.Data.Models;
using System.Collections.Generic;

namespace MarbleCollectorApi.Data.Init
{
    public class DefaultFamily : IDataSeeder<User>
    {
        private const string Family = "Muster";
        private const string Password = "123456";

        public IEnumerable<User> GetDemoData()
        {
            return GetUsers();
        }

        public IEnumerable<User> GetDevelopmentData()
        {
            return GetUsers();
        }

        private User[] GetUsers()
        {
            return new[]
            {
                new User
                {
                    Username = "peter",
                    Email = "peter.muster@gmail.com",
                    Password = Password,
                    Avatar = "https://raw.githubusercontent.com/Ashwinvalento/cartoon-avatar/master/lib/images/male/4.png",
                    Role = Const.UserRoleParent,
                    Family = Family
                },
                new User
                {
                    Username = "petra",
                    Email = "petra.muster@gmail.com",
                    Password = Password,
                    Avatar = "https://raw.githubusercontent.com/Ashwinvalento/cartoon-avatar/master/lib/images/female/10.png",
                    Role = Const.UserRoleParent,
                    Family = Family
                },
                new User
                {
                    Username = "lars",
                    Email = "lars.muster@gmail.com",
                    Password = Password,
                    Avatar = "https://raw.githubusercontent.com/Ashwinvalento/cartoon-avatar/master/lib/images/male/68.png",
                    Role = Const.UserRoleChild,
                    Family = Family
                },
                new User
                {
                    Username = "lara",
                    Email = "lara.muster@gmail.com",
                    Password = Password,
                    Avatar = "https://raw.githubusercontent.com/Ashwinvalento/cartoon-avatar/master/lib/images/female/29.png",
                    Role = Const.UserRoleChild,
                    Family = Family
                },
                new User
                {
                    Username = "lena",
                    Email = "lena.muster@gmail.com",
                    Password = Password,
                    Avatar = "https://raw.githubusercontent.com/Ashwinvalento/cartoon-avatar/master/lib/images/female/31.png",
                    Role = Const.UserRoleChild,
                    Family = Family
                }
            };
        }
    }
}