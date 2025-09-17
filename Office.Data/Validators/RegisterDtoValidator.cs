using FluentValidation;
using Office.Data.DTOs;

namespace Office.Data.Validators {
  public class RegisterDtoValidator : AbstractValidator<RegisterDto> {
    public RegisterDtoValidator() {
      RuleFor(x => x.Name).NotEmpty();
      RuleFor(x => x.Email).NotEmpty().EmailAddress();
      RuleFor(x => x.Password).NotEmpty().MinimumLength(6);
      RuleFor(x => x.Role).NotEmpty();
    }
  }
}
