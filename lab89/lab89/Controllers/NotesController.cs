using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyNotes.Contracts;
using MyNotes.DataAccess;
using MyNotes.Models;

namespace MyNotes.Controllers;

[ApiController]
[Route("[controller]")]
public class NotesController : ControllerBase
{
    private readonly NotesDbContext _dbContext;

    public NotesController(NotesDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateNoteRequest request, CancellationToken ct)
    {
        var note = new Note(request.Title, request.Description);
        await _dbContext.Notes.AddAsync(note, ct);
        await _dbContext.SaveChangesAsync(ct);
        return Ok();
    }

    [HttpGet]
    public async Task<IActionResult> Get([FromQuery] GetNotesRequest request, CancellationToken ct)
    {
        var notesQuery = _dbContext.Notes.AsQueryable();

        // Фильтрация
        if (!string.IsNullOrWhiteSpace(request.Search))
        {
            notesQuery = notesQuery.Where(n =>
                n.Title.ToLower().Contains(request.Search.ToLower()));
        }

        // Сортировка
        notesQuery = request.SortOrder?.ToLower() == "desc"
            ? notesQuery.OrderByDescending(n => n.CreatedAt)
            : notesQuery.OrderBy(n => n.CreatedAt);

        var notes = await notesQuery
            .Select(n => new NoteDto(n.Id, n.Title, n.Description, n.CreatedAt))
            .ToListAsync(ct);

        return Ok(new GetNotesResponse(notes));
    }
}