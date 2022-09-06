namespace API.HelperFunctions
{
    public class FormatUsername
    {
        public static string Format(string username)
        {   // ? is checking if 'uname' is null
            if (username?.Length > 0)
            {
                username = username.ToLower();
                username = (char.ToUpper(username[0])).ToString() + username.Substring(1);
                Console.WriteLine(username);
                return username;
            } else {
                Console.WriteLine(username);
                return null;
            }
        }
    }
}