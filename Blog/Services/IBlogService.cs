﻿using Blog.Models;
using System.Collections.Generic;

namespace Blog.Services
{
    public interface IBlogService
    {
        List<BlogPost> GetLatestPosts();
        List<BlogPost> GetAllPosts();
        string GetPostText(string link);

        List<BlogPost> GetOlderPosts(int oldestPostId);
    }
}