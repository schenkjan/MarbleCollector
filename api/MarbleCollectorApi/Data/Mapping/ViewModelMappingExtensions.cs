using System;
using MarbleCollectorApi.ViewModels;

namespace MarbleCollectorApi.Data.Mapping
{
    public static class ViewModelMappingExtensions
    {
        // TODO js (06.03.2021): Consider to replace concrete mappers with AutoMapper.

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

        public static Models.Assignment Map(this Assignment sourceObject)
        {
            return new Models.Assignment
            {
                Id = sourceObject.Id,
                Created = sourceObject.Created,
                CreatedBy = sourceObject.CreatedBy,
                Modified = sourceObject.Modified,
                ModifiedBy = sourceObject.ModifiedBy,
                ChoreId = sourceObject.ChoreId,
                UserId = sourceObject.UserId,
                Chore = null, // must be updated manually after mapping
                User = null, // must be updated manually after mapping
                State = Enum.Parse<Models.AssignmentState>(sourceObject.State.ToString())
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

        public static Grant Map(this Models.Grant sourceObject)
        {
            return new Grant
            {
                Id = sourceObject.Id,
                Created = sourceObject.Created,
                CreatedBy = sourceObject.CreatedBy,
                Modified = sourceObject.Modified,
                ModifiedBy = sourceObject.ModifiedBy,
                RewardId = sourceObject.RewardId,
                UserId = sourceObject.UserId,
                UserName = sourceObject.User.Username,
                State = Enum.Parse<GrantState>(sourceObject.State.ToString())
            };
        }

        public static Models.Grant Map(this Grant sourceObject)
        {
            return new Models.Grant
            {
                Id = sourceObject.Id,
                Created = sourceObject.Created,
                CreatedBy = sourceObject.CreatedBy,
                Modified = sourceObject.Modified,
                ModifiedBy = sourceObject.ModifiedBy,
                RewardId = sourceObject.RewardId,
                UserId = sourceObject.UserId,
                Reward = null, // must be updated manually after mapping
                User = null, // must be updated manually after mapping
                State = Enum.Parse<Models.GrantState>(sourceObject.State.ToString())
            };
        }

        public static Reward Map(this Models.Reward sourceObject)
        {
            return new Reward
            {
                Id = sourceObject.Id,
                Name = sourceObject.Name,
                Description = sourceObject.Description,
                Value = sourceObject.Value
            };
        }

        public static Models.Reward Map(this Reward sourceObject)
        {
            return new Models.Reward
            {
                Id = sourceObject.Id,
                Name = sourceObject.Name,
                Description = sourceObject.Description,
                Value = sourceObject.Value
            };
        }
    }
}