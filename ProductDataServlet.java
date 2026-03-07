import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.*;
import java.util.stream.Collectors;

@WebServlet("/ProductDataServlet")
public class ProductDataServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // Read the JSON data from the request
        String jsonBody = request.getReader().lines().collect(Collectors.joining(System.lineSeparator()));
        
        // Path to your text file
        String filePath = getServletContext().getRealPath("/") + "inventory.txt";
        
        try (FileWriter fw = new FileWriter(filePath, true);
             BufferedWriter bw = new BufferedWriter(fw);
             PrintWriter out = new PrintWriter(bw)) {
            
            // Writing data in a comma-separated format
            out.println(jsonBody); 
            response.setStatus(HttpServletResponse.SC_OK);
        } catch (IOException e) {
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
        }
    }
}