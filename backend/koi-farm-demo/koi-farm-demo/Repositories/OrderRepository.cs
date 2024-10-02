﻿using Microsoft.EntityFrameworkCore;

public class OrderRepository : IOrderRepository
{
    private readonly KoiFarmDbContext _context;

    public OrderRepository(KoiFarmDbContext context)
    {
        _context = context;
    }

    public async Task<Order> GetOrderByIdAsync(int id)
    {
        return await _context.Orders
            .Include(o => o.OrderLines)
            .FirstOrDefaultAsync(o => o.OrderId == id);
    }

    public async Task<Order> GetByIdAsync(int orderId)
    {
        return await _context.Orders
            .Include(o => o.OrderLines)
            .FirstOrDefaultAsync(o => o.OrderId == orderId);
    }

    public async Task AddOrderAsync(Order order)
    {
        await _context.Orders.AddAsync(order);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateAsync(Order order)
    {
        _context.Orders.Update(order);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteOrderAsync(Order order)
    {
        _context.Orders.Remove(order);
        await _context.SaveChangesAsync();
    }
}
