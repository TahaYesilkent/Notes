using System.ComponentModel.DataAnnotations;

namespace DersNotlariAPI.Models
{
    public class User
    {
        public int Id { get; set; }

        [Required, EmailAddress]
        public string Email { get; set; }

        [Required]
        public string PasswordHash { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.Now;

        // Kullanıcının notları
        public ICollection<Note> Notes { get; set; }


        





    }
}
