using System;

namespace API.Extensions
{
    public static class DateTimeExtensions
    {
        private static DateTime today;
        private static int memberSince;

        public static int CalculateTimeFromUserCreated(this DateTime t)
        {
            today = DateTime.Today;
            memberSince = today.Year - t.Year;
            return memberSince;
        }
    }
}