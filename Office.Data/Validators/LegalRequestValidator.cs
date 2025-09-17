using FluentValidation;
using Office.Data.DTOs;

namespace Office.Data.Validators {
  public class LegalRequestValidator : AbstractValidator<LegalRequestDto> {
    public LegalRequestValidator() {
      RuleFor(x => x.ClientId).GreaterThan(0);
      RuleFor(x => x.Title).NotEmpty();
      RuleFor(x => x.Description).NotEmpty();
    }
  }
}
