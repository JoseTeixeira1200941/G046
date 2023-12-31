﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Web.Resource;
using RobDroneAndGOAuth.Model.Token.TokenDTO;
using RobDroneAndGOAuth.Model.User;
using RobDroneAndGOAuth.Model.User.UserDTOs;
using RobDroneAndGOAuth.Services.IServices;

namespace RobDroneAndGOAuth.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private ILogger<UserController> _logger;
        private IUserAppService _userAppService;


        public UserController(ILogger<UserController> logger,
            IUserAppService userAppService)
        {
            _logger = logger;
            _userAppService = userAppService;
        }

        [HttpPost("Login")]
        public async Task<TokenDto> Login(LoginUserDto loginUser)
        {
            return await _userAppService.Login(loginUser);
        }

        [HttpPost("Register")]
        public async Task<RegisteredDTO> Register(CreateUserDto createUser)
        {
            return await _userAppService.Register(createUser);
        }

        [Authorize]
        [HttpDelete("DeleteAcc")]
        public async Task<IdentityResult> DeleteAcc(AccountDeletionDto user)
        {
            return await _userAppService.DeleteAccount(user.Email);
        }

        [HttpPost("Edit")]
        public async Task<IdentityResult> EditUser(EditUserDto user)
        {
            return await _userAppService.editUser(user);
        }

        [Authorize]
        [HttpPatch("Approve")]
        public async Task<IdentityResult> ApproveUser(string UserEmail)
        {
            return await _userAppService.ApproveUser(UserEmail);
        }
        
        [Authorize]
        [HttpPatch("Denny")]
        public async Task<IdentityResult> DenyUser(string UserEmail)
        {
            return await _userAppService.DenyUser(UserEmail);
        }

        [Authorize]
        [HttpGet("ListNonAprovved")]
        public async Task<List<DisplayUserDto>> ListNonAproved()
        {
            return await _userAppService.ListNonApproved();

        }

    }
}