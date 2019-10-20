using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Blog.Models;
using Blog.Services;
using Microsoft.AspNetCore.Http;

namespace Blog.Controllers
{
    public class HomeController : Controller
    {
        IBlogService _blogService;

        public HomeController(IBlogService blogService)
        {
            _blogService = blogService;
        }
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Favourite()
        {
            return View();
        }

        public IActionResult Teste()
        {
            return View();
        }

        public IActionResult About()
        {
            return View();
        }

        public IActionResult Contact()
        {
            ViewData["Message"] = "Your contact page.";

            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }


        //public JsonResult LatestBlogPosts()
        //{
        //    var posts = new List<BlogPost>() {
        //                 new BlogPost { PostId = 1, Title =
        //                "xxx", ShortDescription = "xxx" },
        //                 new BlogPost { PostId = 2, Title =
        //                "xxx", ShortDescription = "xxx" },
        //                 new BlogPost { PostId = 3, Title =
        //                "xxx", ShortDescription = "xxx" },
        //                 new BlogPost { PostId = 4, Title =
        //                "xxx", ShortDescription = "xxx" },
        //                 new BlogPost { PostId = 5, Title =
        //                "xxx", ShortDescription = "xxx" }
        //    };
        //    return Json(posts);
        //}

        public JsonResult LatestBlogPosts()
        {
            var posts = _blogService.GetLatestPosts();
            return Json(posts);
        }

        public JsonResult FavouritesBlogPosts()
        {
            var posts = _blogService.GetFavouritesPosts();
            return Json(posts);
        }

        public ContentResult Post(string link)
        {
            return Content(_blogService.GetPostText(link));
        }

        public JsonResult MoreBlogPosts(int oldestBlogPostId)
        {
            var posts = _blogService.GetOlderPosts(oldestBlogPostId);
            return Json(posts);
        }
        public JsonResult AlterFavourite(int PostId)
        {
            string fav = HttpContext.Session.GetString($"fav{PostId}");

            fav = fav == "favorito" ? "favorito adicionado" : "favorito";

            HttpContext.Session.SetString($"fav{PostId}", fav);

            //var posts = _blogService.GetOlderPosts(PostId);
            return null; // Json(posts);
        }

    }
}
