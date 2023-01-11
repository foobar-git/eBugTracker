namespace API.HelperFunctions
{
    public class FormatName
    {
        public static string Format(string name)
        {   // ? is checking if 'name' is null
            if (name?.Length > 0)
            {
                name = name.ToLower();
                name = (char.ToUpper(name[0])).ToString() + name.Substring(1);
                return name;
            } else {
                return null;
            }
        }
    }
}