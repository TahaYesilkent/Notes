using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DersNotlariAPI.Models
{
    public class Note
    {
        public int Id { get; set; }

        [Required]
        public string Title { get; set; }

        public string Description { get; set; }

        public string FilePath { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.Now;

        public DateTime? UpdatedAt { get; set; }

        public DateTime? DeletedAt { get; set; } // Soft delete için

        // User ilişkilendirme
        [ForeignKey("User")]
        public int UserId { get; set; }

        public User User { get; set; }
    }
}
