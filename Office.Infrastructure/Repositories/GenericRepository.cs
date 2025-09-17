using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Office.Data.Interfaces;

namespace Office.Infrastructure.Repositories {
  public class GenericRepository<T> : IGenericRepository<T> where T : class {
    protected readonly Microsoft.EntityFrameworkCore.DbContext _context;
    protected readonly DbSet<T> _dbSet;
    public GenericRepository(DbContext context) {
      _context = context;
      _dbSet = context.Set<T>();
    }
    public virtual async Task<T> AddAsync(T entity) {
      await _dbSet.AddAsync(entity);
      await _context.SaveChangesAsync();
      return entity;
    }
    public virtual async Task DeleteAsync(long id) {
      var entity = await _dbSet.FindAsync(id);
      if (entity != null) {
        _dbSet.Remove(entity);
        await _context.SaveChangesAsync();
      }
    }
    public virtual async Task<IEnumerable<T>> GetAllAsync() {
      return await _dbSet.ToListAsync();
    }
    public virtual async Task<T> GetByIdAsync(long id) {
      return await _dbSet.FindAsync(id);
    }
    public virtual async Task UpdateAsync(T entity) {
      _dbSet.Update(entity);
      await _context.SaveChangesAsync();
    }
  }
}
