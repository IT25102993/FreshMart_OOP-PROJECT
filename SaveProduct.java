import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.*;

@WebServlet("/SaveProduct")
public class SaveProduct extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        
        // Retrieve parameters from the form
        String pId = request.getParameter("pId");
        String pName = request.getParameter("pName");
        String pCat = request.getParameter("pCategory");
        String pPrice = request.getParameter("pPrice");
        String pStock = request.getParameter("pStock");

        // Format: ID,Name,Category,Price,Stock
        String dataLine = pId + "," + pName + "," + pCat + "," + pPrice + "," + pStock;

        // Locates the root directory of your web application
        String path = getServletContext().getRealPath("/") + "inventory.txt";
        
        try (FileWriter fw = new FileWriter(path, true);
             BufferedWriter bw = new BufferedWriter(fw);
             PrintWriter out = new PrintWriter(bw)) {
            
            out.println(dataLine);
            
            // Redirect back to the store to see the new product
            response.sendRedirect("order.html");
        } catch (IOException e) {
            response.getWriter().println("Error saving to file: " + e.getMessage());
        }
    }
}