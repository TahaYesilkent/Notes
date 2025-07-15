using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using DersNotlariAPI.Data;
using DersNotlariAPI.Models;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace DersNotlariAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class NoteController : ControllerBase
    {
        private readonly AppDbContext _context;

        public NoteController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/note
        [HttpGet]
        public async Task<IActionResult> GetUserNotes()
        {
            // Token içinden kullanıcı ID’sini al
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null) return Unauthorized("Token geçersiz.");

            int id = int.Parse(userId);

            var notes = await _context.Notes
                .Where(n => n.UserId == id && n.DeletedAt == null)
                .ToListAsync();

            return Ok(notes);
        }
        [HttpPost]
        public async Task<IActionResult> AddNote(NoteCreateDto request)
{
    var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
    if (userId == null) return Unauthorized();

    var note = new Note
    {
        Title = request.Title,
        Description = request.Description,
        FilePath = request.FilePath, // Gerçek dosya upload sonra yapılır
        CreatedAt = DateTime.Now,
        UserId = int.Parse(userId)
    };

    _context.Notes.Add(note);
    await _context.SaveChangesAsync();

    return Ok(note);
}

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateNote(int id, NoteUpdateDto request)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null) return Unauthorized();

            var note = await _context.Notes.FindAsync(id);
            if (note == null) return NotFound("Not bulunamadı.");

            if (note.UserId != int.Parse(userId))
                return Forbid("Bu not size ait değil.");

            note.Title = request.Title;
            note.Description = request.Description;
            note.FilePath = request.FilePath;
            note.UpdatedAt = DateTime.Now;

            await _context.SaveChangesAsync();

            return Ok(note);
        }



        [HttpDelete("{id}")]
        public async Task<IActionResult> SoftDeleteNote(int id)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null) return Unauthorized();

            var note = await _context.Notes.FindAsync(id);
            if (note == null) return NotFound("Not bulunamadı.");

            if (note.UserId != int.Parse(userId))
                return Forbid("Bu not size ait değil.");

            if (note.DeletedAt != null)
                return BadRequest("Not zaten arşivlenmiş.");

            note.DeletedAt = DateTime.Now;
            await _context.SaveChangesAsync();

            return Ok("Not arşive taşındı.");
        }

        [HttpGet("archived")]
        public async Task<IActionResult> GetArchivedNotes()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null) return Unauthorized();

            int id = int.Parse(userId);

            var archivedNotes = await _context.Notes
                .Where(n => n.UserId == id && n.DeletedAt != null)
                .ToListAsync();

            return Ok(archivedNotes);
        }

        [HttpDelete("{id}/hard")]
        public async Task<IActionResult> HardDeleteNote(int id)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null) return Unauthorized();

            var note = await _context.Notes.FindAsync(id);
            if (note == null) return NotFound("Not bulunamadı.");

            if (note.UserId != int.Parse(userId))
                return Forbid("Bu not size ait değil.");

            if (note.DeletedAt == null)
                return BadRequest("Not arşivde değil, önce soft delete yapılmalı.");

            _context.Notes.Remove(note);
            await _context.SaveChangesAsync();

            return Ok("Not kalıcı olarak silindi.");
        }

        [HttpPatch("{id}/restore")]
        public async Task<IActionResult> RestoreNote(int id)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null) return Unauthorized();

            var note = await _context.Notes.FindAsync(id);
            if (note == null) return NotFound("Not bulunamadı.");

            if (note.UserId != int.Parse(userId))
                return Forbid("Bu not size ait değil.");

            if (note.DeletedAt == null)
                return BadRequest("Bu not zaten aktif.");

            note.DeletedAt = null;
            await _context.SaveChangesAsync();

            return Ok("Not başarıyla geri yüklendi.");
        }

        [HttpPost("upload")]
        public async Task<IActionResult> UploadFile(IFormFile file)
        {
            if (file == null || file.Length == 0)
                return BadRequest("Dosya geçersiz.");

            var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads");

            if (!Directory.Exists(uploadsFolder))
                Directory.CreateDirectory(uploadsFolder);

            var uniqueFileName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);
            var filePath = Path.Combine(uploadsFolder, uniqueFileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            return Ok(new { fileName = uniqueFileName });
        }


















    }
}
