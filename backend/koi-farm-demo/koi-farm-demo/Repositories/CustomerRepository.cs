﻿namespace koi_farm_demo.Repositories
{
    public interface ICustomerRepository
    {
        Task AddAsync(Customer customer);
        // Các phương thức khác nếu cần
    }

    public class CustomerRepository : ICustomerRepository
    {
        private readonly KoiFarmDbContext _context;

        public CustomerRepository(KoiFarmDbContext context)
        {
            _context = context;
        }

        public async Task AddAsync(Customer customer)
        {
            await _context.Customers.AddAsync(customer);
            await _context.SaveChangesAsync(); // Đừng quên lưu thay đổi!
        }

        // Các phương thức khác nếu cần
    }

}
