using System.Security.Cryptography;
using System.Text;

namespace restaurantBE.Services
{
    public class PasswordService
    {
        public void CreatePasswordHash(string? password, out string hash, out string salt)
        {
            if (string.IsNullOrWhiteSpace(password))
                throw new ArgumentException("Password cannot be null or empty.", nameof(password));

            using var hmac = new HMACSHA512();
            salt = Convert.ToBase64String(hmac.Key);
            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
            hash = Convert.ToBase64String(computedHash);
        }

        public bool VerifyPassword(string password, string storedHash, string storedSalt)
        {
            var saltBytes = Convert.FromBase64String(storedSalt);
            using (var hmac = new HMACSHA512(saltBytes))
            {
                var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
                return Convert.ToBase64String(computedHash) == storedHash;
            }
        }
    }
}
