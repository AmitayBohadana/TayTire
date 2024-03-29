﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using TemplateMongo.Model;
using TemplateMongo.Services;

namespace TemplateMongo.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BooksController : Controller
    {
        private readonly BookService _bookService;

        public BooksController(BookService bookService)
        {
            _bookService = bookService;
        }
        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public ActionResult<List<Book>> Get() =>
                _bookService.Get();

        //[HttpGet("{id:length(24)}", Name = "GetBook")]
        [HttpGet("byName")]
        public ActionResult<List<string>> Get(string id)
        {
            /*
            var book = _bookService.Get(id);

            if (book == null)
            {
                return NotFound();
            }*/
            var retVal = new List<string> { "Michlin", "Pirelli", "Komho" , id };
            return retVal;
        }

        [HttpPost]
        public ActionResult<Book> Create(Book book)
        {
            _bookService.Create(book);

            return CreatedAtRoute("GetBook", new { id = book.Id.ToString() }, book);
        }

        [HttpPut("{id:length(24)}")]
        public IActionResult Update(string id, Book bookIn)
        {
            var book = _bookService.Get(id);

            if (book == null)
            {
                return NotFound();
            }

            _bookService.Update(id, bookIn);

            return NoContent();
        }

        [HttpDelete("{id:length(24)}")]
        public IActionResult Delete(string id)
        {
            var book = _bookService.Get(id);

            if (book == null)
            {
                return NotFound();
            }

            _bookService.Remove(book.Id);

            return NoContent();
        }

    }
}