using System;
using MarbleCollectorApi.ViewModels;

namespace MarbleCollectorApi.Data.Mapping
{
    public static class ViewModelMappingExtensions
    {
        public static Assignment Map(this Models.Assignment sourceObject)
        {
            return new Assignment
            {
                Id = sourceObject.Id, 
                Created = sourceObject.Created, 
                CreatedBy = sourceObject.CreatedBy,
                Modified = sourceObject.Modified,
                ModifiedBy = sourceObject.ModifiedBy,
                ChoreId = sourceObject.Chore.Id,
                UserId = sourceObject.User.Id,
                UserName = sourceObject.User.Username,
                State = Enum.Parse<AssignmentState>(sourceObject.State.ToString())
            };
        }

        public static Chore Map(this Models.Chore sourceObject)
        {
            return new Chore
            {
                Id = sourceObject.Id,
                Name = sourceObject.Name,
                Description = sourceObject.Description,
                DueDate = sourceObject.DueDate,
                Value = sourceObject.Value
            };
        }

        public static Models.Chore Map(this Chore sourceObject)
        {
            return new Models.Chore
            {
                Id = sourceObject.Id,
                Name = sourceObject.Name,
                Description = sourceObject.Description,
                DueDate = sourceObject.DueDate,
                Value = sourceObject.Value,
            };
        }
    }
}