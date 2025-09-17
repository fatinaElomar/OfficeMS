using System.Collections.Generic;
using System.Threading.Tasks;

namespace Office.Data.Interfaces {
  public interface IGenericRepository<T> where T : class {
    Task<T> GetByIdAsync(long id);
    Task<IEnumerable<T>> GetAllAsync();
    Task<T> AddAsync(T entity);
    Task UpdateAsync(T entity);
    Task DeleteAsync(long id);
  }
}
